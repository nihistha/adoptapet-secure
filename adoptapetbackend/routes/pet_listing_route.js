const router = require('express').Router()

const listingscontroller = require("../controllers/pet_listing_controller")
const { adminGuard } = require('../middleware/authGuard')

router.post('/create',adminGuard,listingscontroller.createListing)
router.delete('/delete_listing/:id',adminGuard,listingscontroller.deleteListing)
router.put('/updatelisting/:id',adminGuard,listingscontroller.updateListing)
router.get('/get_single_listing/:id',listingscontroller.getListing)
router.get('/get_all_listings',listingscontroller.getAllListing)
// router.get('/get_only_listing',listing   scontroller.getOnlyListing)

router.get('/pagination',listingscontroller.pagination)
router.get('/search',listingscontroller.searchProduct)
router.get('/searchpets',listingscontroller.searchPets)

module.exports = router;