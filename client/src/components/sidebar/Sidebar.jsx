import './sidebar.css'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import {Users} from '../../dummyData'
import CloseFreind from '../closeFreind/CloseFreind';
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItems">
                        <RssFeedIcon className='sidebarListIcon'/>
                        <span className='sidebarListItemText'>Feed</span>
                    </li>
                    <li className="sidebarListItems">
                        <ChatIcon className='sidebarListIcon'/>
                        <span className='sidebarListItemText'>Chats</span>
                    </li>
                    <li className="sidebarListItems">
                        <PlayCircleIcon className='sidebarListIcon'/>
                        <span className='sidebarListItemText'>Videos</span>
                    </li>
                    <li className="sidebarListItems">
                        <GroupIcon className='sidebarListIcon'/>
                        <span className='sidebarListItemText'>Group</span>
                    </li>
                    <li className="sidebarListItems">
                        <BookmarkIcon className='sidebarListIcon'/>
                        <span className='sidebarListItemText'>Bookmarks</span>
                    </li>
                    <li className="sidebarListItems">
                        <HelpOutlineIcon className='sidebarListIcon'/>
                        <span className='sidebarListItemText'>Questions</span>
                    </li>
                    <li className="sidebarListItems">
                        <WorkOutlineIcon className='sidebarListIcon'/>
                        <span className='sidebarListItemText'>Jobs</span>
                    </li>
                    <li className="sidebarListItems">
                        <EventIcon className='sidebarListIcon'/>
                        <span className='sidebarListItemText'>Events</span>
                    </li>
                    <li className="sidebarListItems">
                        <SchoolIcon className='sidebarListIcon'/>
                        <span className='sidebarListItemText'>Courses</span>
                    </li>
                </ul>
                <button className='sidebarButton'>
                    Show More
                </button>
                <hr className='sidebarHr'/>
                <ul className="sidebarFreindList">
                    {Users.map((e)=>(
                        <CloseFreind key={e.id} user={e}/>
                    ))}
                    
                    
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
