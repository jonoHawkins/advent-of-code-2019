

module.exports = class InterCodeProgram {
    static END_INSTRUCTION_CODE = 99;

    static INSTRUCTION_DEFINITIONS = {
        1: class SumInterCode {
            static paramCount = 4;
            static operation(memory, params) {
                const [i, a, b, destination] = params;
                memory[destination] = memory[a] + memory[b];
            }
        },
        2: class MultiplyInterCode {
            static paramCount = 4;
            static operation(memory, params) {
                const [_, a, b, destination] = params;
                memory[destination] = memory[a] * memory[b];
            }
        },
    };

    constructor(instructions = [99]) {
        this.instructions = instructions;
    }

    reset() {
        this.memory = [...this.instructions];
        this.instructionPointer = 0;
    }

    run(instructions) {
        if (instructions) {
            this.instructions = instructions;
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

        const instructionDefinition = InterCodeProgram.INSTRUCTION_DEFINITIONS[instructionCode];

        if (instructionDefinition === undefined) {
            throw new Error(`Unknown instruction code ${instructionCode} found at ${this.instructionPointer}`);
        }

        if (typeof instructionDefinition.operation !== 'function') {
            throw new TypeError(`operation for Instruction Definition code ${instructionCode} must be a function`)
        }

        instructionDefinition.operation(
            this.memory,
            this.memory.slice(this.instructionPointer, this.instructionPointer+ instructionDefinition.paramCount)
        );

        this.instructionPointer += instructionDefinition.paramCount;
    }
}