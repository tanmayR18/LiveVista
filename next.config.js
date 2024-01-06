const { config } = require('process')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["utfs.io"]
    }
    // If the  .mjs gives an error
    // webpack: (config) => {
    //     config.module.rules.push({
    //         test: /\.mjs$/,
    //         include: /node_module/,
    //         type: 'javascript/auto',
    //     })

    //     return config;
    // }
}

module.exports = nextConfig
