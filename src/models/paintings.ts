// External dependencies

// Class Implementation
export default class Painting {
    constructor(
        public id: number,
        public name: string, 
        public status: number,
        public description: string, 
        public paintType: string,
        public canvasType: string, 
        public height: number,
        public length: number,
        public date: string,
        public price: number) {}
}