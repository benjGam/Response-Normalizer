/**
 * This interface define structure for literal objects
 * which are used to format `message` field content in responses.
 *
 * Those objects are used initially in bootstrapping process,
 * but they can be used in overrides too.
 */
export interface MessageWrapper {
  success?: string;
  failure?: string;
}
