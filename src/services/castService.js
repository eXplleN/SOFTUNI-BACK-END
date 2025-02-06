import Cast from "../models/Cast";

export default {
    create(castData) {
        return Cast.create(castData);
    }
}