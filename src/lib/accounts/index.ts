import { AccountService } from "./account-service";

export { AccountService } from "./account-service";
export {
  AccountNotFoundError,
  AuthFileMissingError,
  CannotDeleteActiveAccountError,
  CodexAuthError,
  InvalidAccountNameError,
  NoAccountsSavedError,
  PromptCancelledError,
} from "./errors";

export const accountService = new AccountService();
