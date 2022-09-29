// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconUserCheck, IconFiles, IconUserPlus, IconFilePlus, IconList } from '@tabler/icons';

// constant
const icons = {
    IconUserCheck,
    // IconBasket,
    // IconMessages,
    // IconLayoutKanban,
    // IconMail,
    // IconCalendar,
    // IconNfc,
    IconFiles,
    IconUserPlus,
    IconFilePlus,
    IconList
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const application = {
    id: 'application',
    title: <FormattedMessage id="application" />,
    type: 'group',
    children: [
        {
            id: 'Fundraisers',
            title: <FormattedMessage id="Fundraisers" />,
            type: 'collapse',
            icon: icons.IconFiles,
            children: [
                {
                    id: 'fundraiser-create',
                    title: <>Add New fundraiser</>,
                    type: 'item',
                    icon: icons.IconFilePlus,
                    url: '/fundraiser/add-fundraiser'
                },
                {
                    id: 'fundraiser-listing',
                    title: <>fundraiser List</>,
                    type: 'item',
                    icon: icons.IconList,
                    url: '/fundraiser/fundraiser-list'
                }
            ]
        }
    ]
};

export default application;
