import mongoose from "mongoose";

const { Schema } = mongoose;

const exempleSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    colors: {
        type: [String],
        required: true,
        Enumerator: ["red", "blue", "green"]
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String
    }
})

const Exemple = mongoose.model("Exemple", exempleSchema);


// Exemple.create({
//     name: "Iphone",
//     colors: ["red", "blue"],
//     price: 1000,
//     description: "Iphone 12"
// })

const findAll = async () => {
    const exemples = await Exemple.find({});
    console.log(exemples);
}

const findId = async () => {
    const exemple = await Exemple.findById("63721a96b146f2a0f09c734f");
    console.log(exemple);
}

const updateById = async () => {
    const exemple = await Exemple.findByIdAndUpdate("63721a96b146f2a0f09c734f", {
        name: "Iphone 11",
        colors: ["red", "blue", "green"],
        price: 950,
        description: "Iphone 12 soldé"
    }, { runValidators: true, new: true });
    console.log(exemple);

    // const exemple2 = await Exemple.findId("63721a96b146f2a0f09c734f");
    // exemple2.name = "Modifié";
    // exemple2.save();

    // const exemple3 = await Exemple.findId("63721a96b146f2a0f09c734f");
    // exemple3.set({
    //     name: "Modifié 2"
    // })
    // exemple3.save();
}

const deleteById = async () => {
    const exemple = await Exemple.findByIdAndDelete("63721a96b146f2a0f09c734f");
    console.log(exemple);
}

// findId();
// deleteById();
// findAll();
// updateById();

export default Exemple;