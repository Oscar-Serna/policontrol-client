import React, {useContext, useEffect, useState} from "react";
import { GroupsDataContext } from "../../../context/groupsDataContext";
import { AnnouncementCard } from "../../../components/announcementGroup";

export const AdsPage = () => {

  const { getGroupToken } = useContext(GroupsDataContext);
  const [ announcements, setAnnouncements ] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      //const data = await ;
      // setAnnouncements(data);
      // console.log(data)
    }

    // fetchData();
  }, []);

  function renderAnnouncements() {
    return announcements.map((ann, index) => (
      <AnnouncementCard
        key={index}
        title={ann.title}
        description={ann.description}
      />
    ));
  }

  return(
    <>
      
    </>
  )
}