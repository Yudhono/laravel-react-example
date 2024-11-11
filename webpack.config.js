const path = require("path");

module.exports = {
    // ...existing code...
    module: {
        rules: [
            // ...existing rules...
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react"],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    // ...existing code...
};
