type Config = {
    server_ip: string,
    server_port: number,
    version: string,
    premium: boolean,
    logFile: string,
    consoleIsChat: boolean,
    cliPrefix: string,
    enableCLICommands: boolean,
    autoRestart: boolean,
    startupCommands?: string[]
};

const configDefaults = {
    server_port: 25565,
    version: "1.12.2",
};

export { Config, configDefaults };