class InterCodeProgram {
    static END_INSTRUCTION_CODE = 99;

    static INSTRUCTION_DEFINITIONS = {
        1: class SumInterCode {
            static paramCount = 3;
            static operation(memory, params) {
                const [a, b, destination] = params;
                memory[destination] = memory[a] + memory[b];
            }
        },
        2: class MultiplyInterCode {
            static paramCount = 3;
            static operation(memory, params) {
                const [a, b, destination] = params;
                memory[destination] = memory[a] * memory[b];
            }
        },
    };

    constructor(program = [99]) {
        this.program = program;
    }

    reset() {
        this.memory = [...this.program];
        this.instructionPointer = 0;
    }

    run(program) {
        if (program) {
            this.program = program;
        }

        this.reset();

        while (this.memory[this.instructionPointer] !== undefined) {
            this.step();
        }

        return this.memory;
    }

    step() {
        const instructionCode = this.memory[this.instructionPointer];

        if (instructionCode === InterCodeProgram.END_INSTRUCTION_CODE) {
            this.instructionPointer = -1;
            return;
        }

        const instructionDefinition = this.resolveInstruction(instructionCode);

        if (instructionDefinition === undefined) {
            throw new Error(`Unknown instruction code ${instructionCode} found at ${this.instructionPointer}`);
        }

        const params = this.resolveParams();
    }

    resolveInstruction(instructionCode) {
        // left pad
        while (instructionCode.length < 5) {
            instructionCode = '0' + instructionCode;
        }

        const [a, b, ...paramModes] = instructionCode.split('').reverse();

        return {
            opcode: b * 10 + a * 1,
            paramModes: paramModes.reverse().map(n => parseInt(n, 10)),
        }
    }
}

module.exports = InterCodeProgram;