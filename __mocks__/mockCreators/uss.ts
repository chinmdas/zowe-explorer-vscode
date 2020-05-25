/*
* This program and the accompanying materials are made available under the terms of the *
* Eclipse Public License v2.0 which accompanies this distribution, and is available at *
* https://www.eclipse.org/legal/epl-v20.html                                      *
*                                                                                 *
* SPDX-License-Identifier: EPL-2.0                                                *
*                                                                                 *
* Copyright Contributors to the Zowe Project.                                     *
*                                                                                 *
*/

import { ZoweUSSNode } from "../../src/uss/ZoweUSSNode";
import * as imperative from "@zowe/imperative";
import * as vscode from "vscode";
import * as globals from "../../src/globals";
import { ZoweTreeProvider } from "../../src/abstract/ZoweTreeProvider";
import { USSTree } from "../../src/__mocks__/USSTree";
import { getIconByNode } from "../../src/generators/icons";

export function createUSSTree(favoriteNodes: ZoweUSSNode[], sessionNodes: ZoweUSSNode[], treeView?: vscode.TreeView<ZoweTreeProvider>): any {
    const newTree = {
        mSessionNodes: [...sessionNodes],
        mFavorites: favoriteNodes,
        addSession: jest.fn(),
        refresh: jest.fn(),
        removeRecall: jest.fn(),
        openItemFromPath: jest.fn(),
        addRecall: jest.fn(),
        getRecall: jest.fn(),
        checkCurrentProfile: jest.fn(),
        refreshElement: jest.fn(),
        getChildren: jest.fn(),
        getTreeType: jest.fn().mockImplementation(() => globals.PersistenceSchemaEnum.USS),
        addFavorite: jest.fn(),
        removeFavorite: jest.fn(),
        searchInLoadedItems: jest.fn(),
        getTreeView: jest.fn().mockImplementation(() => treeView),
        setItem: jest.fn(),
        addHistory: jest.fn()
    }
    return newTree;
}

export function createUSSNode(session, profile) {
    const mParent = new ZoweUSSNode("parentNode", vscode.TreeItemCollapsibleState.Expanded, null, session, null, false, profile.name);
    const ussNode = new ZoweUSSNode("usstest", vscode.TreeItemCollapsibleState.Expanded, mParent, session, null, false, profile.name);
    ussNode.contextValue = globals.USS_SESSION_CONTEXT;
    ussNode.fullPath = "/u/myuser";
    return ussNode;
}

export function createUSSSessionNode(session: imperative.Session, profile: imperative.IProfileLoaded) {
    const zoweUSSNode = new ZoweUSSNode("parent", vscode.TreeItemCollapsibleState.Collapsed, null,
        session, "/", false, profile.name, undefined, profile);
    zoweUSSNode.fullPath = "test";
    zoweUSSNode.contextValue = globals.USS_SESSION_CONTEXT;
    const targetIcon = getIconByNode(zoweUSSNode);
    if (targetIcon) {
        zoweUSSNode.iconPath = targetIcon.path;
    }

    return zoweUSSNode;
}

export function createFavoriteUSSNode(session, profile) {
    const ussNodeF = new ZoweUSSNode("[profile]: usstest", vscode.TreeItemCollapsibleState.Expanded, null, session, null, false, profile.name);
    const mParent = new ZoweUSSNode("Favorites", vscode.TreeItemCollapsibleState.Expanded, null, session, null, false, profile.name);
    mParent.contextValue = globals.FAVORITE_CONTEXT;
    ussNodeF.contextValue = globals.DS_TEXT_FILE_CONTEXT + globals.FAV_SUFFIX;
    ussNodeF.fullPath = "/u/myuser/usstest";
    ussNodeF.tooltip = "/u/myuser/usstest";
    return ussNodeF;
}