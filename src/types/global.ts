export {} // TODO: why does this need to be a modlule?? https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul

declare global {
	/**
	 * Fix for axios while we wait for ^0.2.1 to be published
	 * merge: https://github.com/axios/axios/commit/b7e954eba3911874575ed241ec2ec38ff8af21bb
	 * issue: https://github.com/axios/axios/issues/3219
	 */
	interface ProgressEvent {} // eslint-disable-line
}
