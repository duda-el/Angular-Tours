declare module 'pikaday' {
    interface PikadayOptions {
      field: HTMLInputElement;
      format?: string;
      onSelect?: (date: Date) => void;
    }
  
    export default class Pikaday {
      constructor(options: PikadayOptions);
      show(): void;
      hide(): void;
      destroy(): void;
    }
  }
  