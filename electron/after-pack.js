"use strict";

var childProcess = require("child_process");
var fs = require("fs/promises");
var path = require("path");

var CREATOR_NAME = "Matroskin";
var APP_METADATA_COMMENT = "KM Companion created by Matroskin.";

module.exports.default = async function afterPack(context) {
	if (context.electronPlatformName !== "win32") {
		return;
	}

	var projectDir = context.packager.projectDir;
	var appInfo = context.packager.appInfo;
	var exePath = path.join(context.appOutDir, appInfo.productFilename + ".exe");
	var iconPath = path.join(projectDir, "electron", "assets", "km-companion-icon.ico");
	var rceditPath = require.resolve("electron-winstaller/vendor/rcedit.exe", {paths: [projectDir]});

	await fs.access(exePath);
	await fs.access(iconPath);
	await fs.access(rceditPath);

	var args = [
		exePath,
		"--set-icon",
		iconPath,
		"--set-version-string",
		"FileDescription",
		appInfo.productName,
		"--set-version-string",
		"ProductName",
		appInfo.productName,
		"--set-version-string",
		"LegalCopyright",
		appInfo.copyright,
		"--set-version-string",
		"CompanyName",
		appInfo.companyName || CREATOR_NAME,
		"--set-version-string",
		"InternalName",
		appInfo.productFilename,
		"--set-version-string",
		"OriginalFilename",
		appInfo.productFilename + ".exe",
		"--set-version-string",
		"Comments",
		APP_METADATA_COMMENT,
		"--set-file-version",
		appInfo.shortVersion || appInfo.buildVersion,
		"--set-product-version",
		appInfo.shortVersionWindows || appInfo.getVersionInWeirdWindowsForm()
	];

	await execFile(rceditPath, args);
	console.log("Stamped Windows executable icon: " + path.relative(projectDir, exePath));
};

function execFile(file, args) {
	return new Promise(function (resolve, reject) {
		childProcess.execFile(file, args, function (error, stdout, stderr) {
			if (stdout) {
				process.stdout.write(stdout);
			}
			if (stderr) {
				process.stderr.write(stderr);
			}
			if (error) {
				reject(error);
				return;
			}
			resolve();
		});
	});
}
