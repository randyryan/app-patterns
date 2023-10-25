/* SystemJS module definition - Codesandbox declarations */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

/**
 * You will need to create a declaration file if it doesn't already exist in your project.
 * Declartion must have a  files have the `.d.ts` filename extension.
 *
 * Declaring thid-party module
 */
declare module "@carbon/icons/*";
