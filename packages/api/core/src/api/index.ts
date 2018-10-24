import 'colors';
import { ForgeMakeResult } from '@electron-forge/shared-types';
import { ChildProcess } from 'child_process';

import _import, { ImportOptions } from './import';
import init, { InitOptions } from './init';
import install, { InstallOptions, Asset as InstallAsset } from './install';
import lint, { LintOptions } from './lint';
import make, { MakeOptions } from './make';
import _package, { PackageOptions } from './package';
import publish, { PublishOptions } from './publish';
import start, { StartOptions } from './start';

import { fromBuildIdentifier } from '../util/forge-config';
import { hasYarn, yarnOrNpmSpawn } from '../util/yarn-or-npm';

export class ForgeAPI {
  /**
   * Attempt to import a given module directory to the Electron Forge standard.
   *
   * * Sets up `git` and the correct NPM dependencies
   * * Adds a template forge config to `package.json`
   */
  import(opts: ImportOptions) {
    return _import(opts);
  }
  /**
   * Initialize a new Electron Forge template project in the given directory.
   */
  init(opts: InitOptions) {
    return init(opts);
  }
  /**
   * Install an Electron application from GitHub.
   *
   * Works on all three platforms for all major distributable types.
   */
  install(opts: InstallOptions) {
    return install(opts);
  }
  /**
   * Lint a local Electron application.
   *
   * The promise will be rejected with the stdout+stderr of the linting process
   * if linting fails or will be resolved if it succeeds.
   */
  lint(opts: LintOptions) {
    return lint(opts);
  }
  /**
   * Make distributables for an Electron application
   */
  make(opts: MakeOptions) {
    return make(opts);
  }
  /**
   * Resolves hooks if they are a path to a file (instead of a `Function`)
   */
  package(opts: PackageOptions) {
    return _package(opts);
  }
  /**
   * Publish an Electron application into the given target service
   */
  publish(opts: PublishOptions) {
    return publish(opts);
  }
  /**
   * Start an Electron application.
   *
   * Handles things like native module rebuilding for you on the fly
   */
  start(opts: StartOptions) {
    return start(opts);
  }
}

export class ForgeUtils {
  /**
   * Helper for creating a dynamic config value that will get it's real value
   * based on the "buildIdentifier" in your forge config.
   *
   * Usage:
   * `fromBuildIdentifier({ stable: 'App', beta: 'App Beta' })`
   */
  fromBuildIdentifier<T>(map: { [key: string]: T | undefined }) {
    return fromBuildIdentifier(map);
  }

  hasYarn = hasYarn;
  yarnOrNpmSpawn = yarnOrNpmSpawn;
}

const api = new ForgeAPI();
const utils = new ForgeUtils();

export {
  ForgeMakeResult,
  ImportOptions,
  InitOptions,
  InstallAsset,
  InstallOptions,
  LintOptions,
  MakeOptions,
  PackageOptions,
  PublishOptions,
  StartOptions,
  api,
  utils,
};
