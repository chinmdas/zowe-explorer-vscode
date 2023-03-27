/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright Contributors to the Zowe Project.
 *
 */

import { Gui, ZoweVsCodeExtension } from "@zowe/zowe-explorer-api";
import * as vscode from "vscode";
import * as nls from "vscode-nls";
import * as globals from "../globals";

// Set up localization
nls.config({
    messageFormat: nls.MessageFormat.bundle,
    bundleFormat: nls.BundleFormat.standalone,
})();
const localize: nls.LocalizeFunc = nls.loadMessageBundle();

export async function initializeZoweLogger(context: vscode.ExtensionContext): Promise<void> {
    try {
        const logsPath: string = ZoweVsCodeExtension.customLoggingPath ?? context.extensionPath;
        globals.initLogger(logsPath);
        globals.LOG.debug(localize("initialize.log.debug", "Initialized logger from VSCode extension"));
    } catch (err) {
        // Don't log error if logger failed to initialize
        const errorMessage = localize("initialize.log.error", "Error encountered while activating and initializing logger");
        await Gui.errorMessage(`${errorMessage}: ${err.message}`);
    }
}
