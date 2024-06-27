import { Marker, useMap } from 'react-leaflet';

const DraggableMarker = ({ initialPosition, setPosition }) => {
    const map = useMap();

    // Handle marker drag events
    const handleMarkerDrag = (e) => {
        setPosition([e.latlng.lng, e.latlng.lat]); // Update marker position
    };

    return (
        <Marker
            position={initialPosition}
            draggable={true}
            eventHandlers={{
                dragend: handleMarkerDrag,
            }}
        />
    );
};

export default DraggableMarker;
