export class CodexAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

export class AuthFileMissingError extends CodexAuthError {
  constructor(targetPath: string) {
    super(
      `No Codex auth file found at ${targetPath}. ` +
        `Log into Codex first so ~/.codex/auth.json exists.`,
    );
  }
}

export class AccountNotFoundError extends CodexAuthError {
  constructor(accountName: string) {
    super(`No saved Codex account named "${accountName}" was found.`);
  }
}

export class NoAccountsSavedError extends CodexAuthError {
  constructor() {
    super(`No saved Codex accounts yet. Run "codex-auth save <name>" first.`);
  }
}

export class InvalidAccountNameError extends CodexAuthError {
  constructor() {
    super(
      "Account names must include at least one non-space character and " +
        "may contain letters, numbers, dashes, underscores, and dots.",
    );
  }
}

export class PromptCancelledError extends CodexAuthError {
  constructor() {
    super("No account selected. The operation was cancelled.");
  }
}

export class CannotDeleteActiveAccountError extends CodexAuthError {
  constructor(accountName: string) {
    super(
      `Cannot delete the currently active account "${accountName}". ` +
        `Switch to another account first using "codex-auth use <name>".`,
    );
  }
}
