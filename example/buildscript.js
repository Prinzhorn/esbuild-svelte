const fs = require("fs");
const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");

//make sure the directoy exists before stuff gets put into it
if (!fs.existsSync("./dist/")) {
    fs.mkdirSync("./dist/");
}

//build the application
esbuild
    .build({
        entryPoints: ["./entry.js"],
        outdir: "./dist",
        format: "esm",
        minify: false, //so the resulting code is easier to understand
        bundle: true,
        splitting: true,
        sourcemap: "inline",
        plugins: [sveltePlugin()],
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

//use a basic html file to test with
fs.copyFile("./index.html", "./dist/index.html", (err) => {
    if (err) throw err;
});
