
use solana_client::rpc_client::RpcClient;
use solana_sdk::{
    commitment_config::CommitmentConfig,
    instruction::{AccountMeta, Instruction},
    message::Message,
    pubkey::Pubkey,
    signature::{Keypair, Signer},
    system_instruction,
    transaction::Transaction,
};
use borsh::BorshSerialize;
use sha2::{Sha256, Digest};
use std::str::FromStr;

// Define the program ID (replace with your actual program ID)
const PROGRAM_ID: &str = "Your_Program_ID_Here";

#[derive(BorshSerialize)]
enum ClientInstruction {
    StoreDocument { document_hash: [u8; 32] },
    UpdateDocument { document_hash: [u8; 32] },
}

pub struct DocumentStorageClient {
    rpc_client: RpcClient,
    payer: Keypair,
}

impl DocumentStorageClient {
    pub fn new(rpc_url: &str, payer: Keypair) -> Self {
        let rpc_client = RpcClient::new_with_commitment(rpc_url.to_string(), CommitmentConfig::confirmed());
        Self { rpc_client, payer }
    }

    pub fn store_document(&self, document_content: &str) -> Result<(), Box<dyn std::error::Error>> {
        let program_id = Pubkey::from_str(PROGRAM_ID)?;
        let document_hash = self.calculate_hash(document_content);
        
        // Create a new account to store the document data
        let document_account = Keypair::new();
        
        let create_account_ix = system_instruction::create_account(
            &self.payer.pubkey(),
            &document_account.pubkey(),
            self.rpc_client.get_minimum_balance_for_rent_exemption(32 + 32)?, // Size of DocumentAccount
            32 + 32, // Size of DocumentAccount
            &program_id,
        );

        let instruction_data = ClientInstruction::StoreDocument { document_hash }.try_to_vec()?;
        let store_document_ix = Instruction::new_with_borsh(
            program_id,
            &instruction_data,
            vec![
                AccountMeta::new(document_account.pubkey(), false),
                AccountMeta::new_readonly(self.payer.pubkey(), true),
            ],
        );

        let message = Message::new(
            &[create_account_ix, store_document_ix],
            Some(&self.payer.pubkey()),
        );
        let recent_blockhash = self.rpc_client.get_latest_blockhash()?;
        let transaction = Transaction::new(&[&self.payer, &document_account], message, recent_blockhash);

        self.rpc_client.send_and_confirm_transaction(&transaction)?;

        println!("Document stored with account: {}", document_account.pubkey());
        Ok(())
    }

    pub fn update_document(&self, document_account: Pubkey, document_content: &str) -> Result<(), Box<dyn std::error::Error>> {
        let program_id = Pubkey::from_str(PROGRAM_ID)?;
        let document_hash = self.calculate_hash(document_content);

        let instruction_data = ClientInstruction::UpdateDocument { document_hash }.try_to_vec()?;
        let update_document_ix = Instruction::new_with_borsh(
            program_id,
            &instruction_data,
            vec![
                AccountMeta::new(document_account, false),
                AccountMeta::new_readonly(self.payer.pubkey(), true),
            ],
        );

        let message = Message::new(&[update_document_ix], Some(&self.payer.pubkey()));
        let recent_blockhash = self.rpc_client.get_latest_blockhash()?;
        let transaction = Transaction::new(&[&self.payer], message, recent_blockhash);

        self.rpc_client.send_and_confirm_transaction(&transaction)?;

        println!("Document updated for account: {}", document_account);
        Ok(())
    }

    fn calculate_hash(&self, content: &str) -> [u8; 32] {
        let mut hasher = Sha256::new();
        hasher.update(content.as_bytes());
        hasher.finalize().into()
    }
}

fn main() {
    let rpc_url = "https://api.devnet.solana.com".to_string();
    let payer = Keypair::new(); // In a real application, you would load an existing keypair
    let client = DocumentStorageClient::new(&rpc_url, payer);

    // Example usage
    if let Err(err) = client.store_document("This is a test document") {
        eprintln!("Error storing document: {}", err);
    }

    // To update a document, you would need the public key of the account storing the document
    let document_account = Pubkey::new_unique(); // This should be a real account public key
    if let Err(err) = client.update_document(document_account, "This is an updated test document") {
        eprintln!("Error updating document: {}", err);
    }
}

