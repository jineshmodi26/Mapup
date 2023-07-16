const turf = require('@turf/turf')
const lines = require('../lines/lines.json')
const getError = require('../utils/dbErrorHandle')

module.exports = {
    intersect: async (req, res) => {
        try {
            const geojson = req.body.linestring
            if (geojson?.type !== 'LineString' || !Array.isArray(geojson?.coordinates)) {
                return res.status(500).json({
                    error: 'Invalid linestring'
                })
            }

            const inputGeoJSON = turf.lineString(geojson.coordinates)

            // Find intersecting lines
            const intersectingLines = lines.map((line, index) => {
                const lineGeoJSON = turf.lineString(line.line.coordinates)
                return { line: 'L' + index, point: turf.lineIntersect(lineGeoJSON, inputGeoJSON) }
            })

            // Return the intersecting lines or empty array
            const intersectionPoints = intersectingLines.filter((line) => line.point.features.length !== 0)

            if (intersectionPoints.length !== 0) {
                return res.status(200).json({
                    data: intersectionPoints
                })
            }

            return res.status(200).json({
                data: []
            })
        } catch (error) {
            const errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message: errMsg.length > 0 ? errMsg : 'Something went wrong.'
            })
        }
    }
}
