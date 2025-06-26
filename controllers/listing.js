const Listing = require("../models/listing")

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({})
    res.render("./listings/index.ejs", { allListings })
}
module.exports.renderNewForm = (req, res) => {
    res.render("./listings/new.ejs")
}
module.exports.saveListing = async (req, res) => {
    let { title, description, price, location, country, image } = req.body
    let url = req.file.path
    let filename = req.file.filename
    let sampleListing = new Listing({
        title: title,
        description: description,
        price: price,
        location: location,
        country: country,
        image: { url: url, filename: filename }
    });
    sampleListing.owner = req.user._id
    await sampleListing.save()
    req.flash("success", "New Listing Created")
    res.redirect("/listings")
}
module.exports.editForm = async (req, res) => {
    let { id } = req.params
    const editListing = await Listing.findById(id)

    // console.log(editListing)
    res.render("./listings/edit.ejs", { editListing })
}
module.exports.saveEditListing = async (req, res) => {
    let { id } = req.params
    let { title, description, price, country, location } = req.body
    const updateListing = await Listing.findByIdAndUpdate(id, { title, description, price, country, location }, { new: true })
    if (typeof req.file !== "undefined") {
        let url = req.file.path
        let filename = req.file.filename
        updateListing.image =  { url: url, filename: filename }
        await updateListing.save()
    }
    req.flash("success", "Edited Listing ");
    res.redirect("/listings")
    // console.log(price)
}
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params
    // console.log(id)
    await Listing.findByIdAndDelete(id)
    req.flash("error", "Listing Deleted")
    res.redirect("/listings")
}
module.exports.showListing = async (req, res, next) => {
    let { id } = req.params;
    const specificListing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "createdBy" } }).populate("owner");

    if (!specificListing) {
        req.flash("error", "Listing you are searching for has been deleted");
        return res.redirect("/listings"); // Redirect instead of rendering
    }
    res.render("./listings/show.ejs", { specificListing });
}