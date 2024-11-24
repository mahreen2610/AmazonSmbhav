use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
    program_error::ProgramError,
};
use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct DocumentAccount {
    pub document_hash: [u8; 32],
    pub owner: Pubkey,
}

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let account = next_account_info(accounts_iter)?;
    let owner = next_account_info(accounts_iter)?;

    if account.owner != program_id {
        return Err(ProgramError::IncorrectProgramId.into());
    }

    if !owner.is_signer {
        return Err(ProgramError::MissingRequiredSignature.into());
    }

    let instruction = DocumentInstruction::unpack(instruction_data)?;

    match instruction {
        DocumentInstruction::StoreDocument { document_hash } => {
            msg!("Instruction: Store Document");
            let document_account = DocumentAccount {
                document_hash,
                owner: *owner.key,
            };
            document_account.serialize(&mut &mut account.data.borrow_mut()[..])?;
        }
        DocumentInstruction::UpdateDocument { document_hash } => {
            msg!("Instruction: Update Document");
            let mut document_account = DocumentAccount::try_from_slice(&account.data.borrow())?;
            if document_account.owner != *owner.key {
                return Err(ProgramError::InvalidAccountData.into());
            }
            document_account.document_hash = document_hash;
            document_account.serialize(&mut &mut account.data.borrow_mut()[..])?;
        }
    }

    Ok(())
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum DocumentInstruction {
    StoreDocument { document_hash: [u8; 32] },
    UpdateDocument { document_hash: [u8; 32] },
}

impl DocumentInstruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (&variant, rest) = input.split_first().ok_or(ProgramError::InvalidInstructionData)?;
        Ok(match variant {
            0 => Self::StoreDocument {
                document_hash: rest.try_into().map_err(|_| ProgramError::InvalidInstructionData)?,
            },
            1 => Self::UpdateDocument {
                document_hash: rest.try_into().map_err(|_| ProgramError::InvalidInstructionData)?,
            },
            _ => return Err(ProgramError::InvalidInstructionData),
        })
    }
}


