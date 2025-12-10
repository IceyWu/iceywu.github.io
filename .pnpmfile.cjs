module.exports = {
	hooks: {
		readPackage(pkg) {
			// 确保 better-sqlite3 能够运行构建脚本
			if (pkg.name === "better-sqlite3") {
				pkg.scripts = pkg.scripts || {};
				if (!pkg.scripts.install) {
					pkg.scripts.install = "node-gyp rebuild";
				}
			}
			return pkg;
		},
	},
};
