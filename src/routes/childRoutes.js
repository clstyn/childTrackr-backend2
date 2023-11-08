const express = require("express");
const router = express.Router();
const childController = require("../controllers/childController");

router.post("/childregister", childController.registerChild);

router.post("/childlogin", childController.loginChild);

router.get("/childlogin", childController.getChildlogin);

router.get("/childProfiles", childController.getChildProfiles);

router.post("/childProfiles", childController.addChildProfile);

router.delete("/childProfiles/:id", childController.deleteChildProfile);

router.post("/coordinates", childController.ChildCoords);

router.post("/findCoordinates", childController.updateChildCoords);

router.put("/findCoordinates/:username", childController.liveChildCoords);

router.get("/findCoordinates", childController.getChildCoords);

module.exports = router;
