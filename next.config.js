const { config } = require('process')

/** @type {import('next').NextConfig} */
const nextConfig = {
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
