const getBicycleCoords = async (bicycle_coords, bicycle_id) => {
    try {
        const coords = await bicycle_coords.findByPk(bicycle_id)
        if (!coords) {
            return false;
        }
        return coords;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = getBicycleCoords;