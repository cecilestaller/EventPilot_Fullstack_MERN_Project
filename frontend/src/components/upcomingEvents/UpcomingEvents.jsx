import { useEventFetchContext } from "../../context/eventFetchContext";
import "./UpcomingEvents.scss";

const UpcomingEvents = () => {

    const { fetchEventData, setFetchEventData } = useEventFetchContext();

    return (
        <article>
            <p>In deiner Nähe Komponente</p>
        </article>
    );
};

export default UpcomingEvents;
