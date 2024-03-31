import { Environment } from "vitest";

export default <Environment>{
    name: 'prisma',
    transformMode: 'ssr',
    async setup() {
        console.log('Executed');

        return {
            async teardown() { 
                console.log('EU TENTEIIIIIII')
             }
        };
    }
}