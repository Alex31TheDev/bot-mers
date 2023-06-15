export default class Util {
    static delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static splitArgs(str: string) {
        const ind = str.indexOf(" ");
        let name, args;

        if(ind === -1) {
            name = str;
            args = "";
        } else {
            name = str.slice(0, ind),
            args = str.slice(ind + 1);
        }

        return [name.toLowerCase(), args];
    }

    static waitForCondition(condition: () => boolean, timeoutError: any, timeout = 60000, interval = 100) {
        return new Promise<void>((resolve, reject) => {
            let _timeout: NodeJS.Timeout | undefined;
            
            if(timeout >= 0) {
                _timeout = setTimeout(() => reject(timeoutError), timeout);
            }

            setInterval(() => {
                if(condition()) {
                    if(_timeout) {
                        clearTimeout(_timeout);
                    }

                    resolve();
                }
            }, interval);
        });
    }
}