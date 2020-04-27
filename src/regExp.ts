export const whitespace = /(\t|\n|\r|\s+)/;
export const comment = /^\/\*(.+)\*\//;
export const string = /^((\"(.+)\")|(\'(.+)\'))/
export const number2bit = /^(0b[0|1]{1,})/
export const number8bit = /^(0[0-8]{1,})/
export const number10bit = /^(([0-9]{1,})?(\.\d+)?)/
export const number16bit = /^(0x[0-9a-fA-F]{1,})/