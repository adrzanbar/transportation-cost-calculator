class Vehiculo {
    #id; // Private property to hold the value of id

    set id(value) {
        if (value === undefined) this.#id = value;
        else if (value < 0) this.#id = undefined;
        else this.#id = value; // Correctly set the value of id when it's not negative or undefined
    }

    get id() {
        return this.#id; // Getter to access the private id property
    }
}
