import { Args } from "@oclif/core";
import prompts from "prompts";
import { BaseCommand } from "../lib/base-command";
import { NoAccountsSavedError, PromptCancelledError } from "../lib/accounts";

export default class DeleteCommand extends BaseCommand {
  static description = "Delete a saved account from ~/.codex/accounts";

  static args = {
    account: Args.string({
      name: "account",
      required: false,
      description: "Account to delete",
    }),
  } as const;

  async run(): Promise<void> {
    await this.runSafe(async () => {
      const { args } = await this.parse(DeleteCommand);
      let account = args.account as string | undefined;

      if (!account) {
        account = await this.promptForAccount();
      }

      const deleted = await this.accounts.removeAccount(account);
      this.log(`Deleted Codex account "${deleted}".`);
    });
  }

  private async promptForAccount(): Promise<string> {
    const accounts = await this.accounts.listAccountNames();
    if (!accounts.length) {
      throw new NoAccountsSavedError();
    }

    const current = await this.accounts.getCurrentAccountName();

    const response = await prompts(
      {
        type: "select",
        name: "account",
        message: "Select account to delete",
        choices: accounts.map((name) => ({
          title: current === name ? `${name} (active)` : name,
          value: name,
        })),
      },
      {
        onCancel: () => {
          throw new PromptCancelledError();
        },
      },
    );

    const picked = response.account as string | undefined;
    if (!picked) {
      throw new PromptCancelledError();
    }

    return picked;
  }
}
