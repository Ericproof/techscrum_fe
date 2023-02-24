import { ISummaryLink } from '../components/Card/SummaryLinksCard/SummaryLinksCard';

const PAGE_TITLE_MAIN_TEXT = 'create the perfect Agile workflow with Board vie';
const GET_START_SECTION_DESCRIPTION_TEXT =
  'Build a flexible Kanban system to visualize your work and improve project management.';
const GET_START_SECTION_VIDEO_URL =
  'https://clickup.com/videos/features/kanban-board/board-view-agile-inventory.mp4';

export const GET_START_SECTION_DATA = {
  PAGE_TITLE_MAIN_TEXT,
  GET_START_SECTION_DESCRIPTION_TEXT,
  GET_START_SECTION_VIDEO_URL
};

export const BOARD_SECTION_DATA_LIST = [
  {
    MAIN_TITLE_TEXT: 'group your Boards your way',
    SUB_TITLE_TEXT: 'flexible grouping',
    THEME_COLOR: 'purple',
    DESCRIPTION:
      'Arrange your columns to analyze projects from any angle. Group by status, assignee, priority, and more.',
    VIDEO_URL: 'https://clickup.com/videos/features/kanban-board/board-view-grouping.mp4'
  },
  {
    MAIN_TITLE_TEXT: 'see all your Boards in one view',
    SUB_TITLE_TEXT: 'everything view',
    THEME_COLOR: 'purple',
    DESCRIPTION:
      'Get an overview of where all your team projects stand at a glance with Everything view. See multiple workflows in one view, even if they have different statuses.',
    VIDEO_URL: 'https://clickup.com/videos/features/kanban-board/board-view-status-change.mp4'
  },
  {
    MAIN_TITLE_TEXT: 'visualize any process with Custom Statuses',
    SUB_TITLE_TEXT: 'CUSTOM STATUSES',
    THEME_COLOR: 'purple',
    DESCRIPTION:
      'Create unique statuses for any workflow, from sprints to multi-stage processes. Add new statuses or edit existing ones directly in Board view.',
    VIDEO_URL: 'https://clickup.com/videos/features/kanban-board/board-view-custom-status.mp4'
  },
  {
    MAIN_TITLE_TEXT: 'Drag-and-drop your updates',
    SUB_TITLE_TEXT: 'DRAG & DROP',
    THEME_COLOR: 'purple',
    DESCRIPTION:
      'Quickly move tasks through workflows and adjust priorities. Drag and drop a task into any status and move the task up or down to change the priority of the task.',
    VIDEO_URL: 'https://clickup.com/videos/features/kanban-board/board-view-drag-drop-status.mp4'
  },
  {
    MAIN_TITLE_TEXT: 'Make quick changes in bulk',
    SUB_TITLE_TEXT: 'BULK ACTION TOOLBAr',
    THEME_COLOR: 'purple',
    DESCRIPTION:
      'Save time making task updates in bulk with the Bulk Action Toolbar. Add assignees, change statuses, and delete tasks, all without leaving Board view.',
    VIDEO_URL: 'https://clickup.com/videos/features/kanban-board/multitask-toolbar.mp4'
  }
];

export const FEATURE_SECTION_DATA = {
  SECTION_TITLE_MAIN_TEXT: 'organize work and assess bandwidth',
  SECTION_TITLE_SUB_TEXT: 'visualize',
  SECTION_TITLE_SUB_COLOR: 'purple',
  SECTION_CARDS: [
    {
      CARD_CONTENT_LIST: [
        'manage tasks, workflows, & goals',
        'collaborate in Docs & Whiteboards',
        'save time with no-code automations'
      ],
      CARD_TITLE_TEXT: 'stay on track with sorting and filtering',
      CARD_IMG_SRC: 'https://clickup.com/images/features/kanban-board/board-view-fiter.png',
      CARD_THEME_COLOR: 'brand'
    },

    {
      CARD_CONTENT_LIST: [
        "Easily see when there's too much work in a status",
        'Measure workload by sprint points, time estimates, and more',
        'Spot bottlenecks at a glance to ship projects faster'
      ],
      CARD_TITLE_TEXT: 'monitor capacity with Work in Progress Limits',
      CARD_IMG_SRC: 'https://clickup.com/images/features/kanban-board/board-view-limits.png',
      CARD_THEME_COLOR: 'pink'
    }
  ]
};

export const CUMSTOMER_SECTION_DATA = {
  SECTION_TITLE: "save on day every week with TechScrum's Board view",
  SECTION_BACKGROUND_IMG: 'https://clickup.com/images/collaboration-detection/bg__with-dotted.svg'
};

export const SUMMARY_LINKS_DATA: ISummaryLink[] = [
  {
    iconImgSrc: 'https://clickup.com/images/kindness/free-training.svg',
    summaryText: 'Free training & 24-hour support',
    linkText: 'Free training'
  },
  {
    iconImgSrc: 'https://clickup.com/images/kindness/security.svg',
    summaryText: 'Serious about security & privacy',
    linkText: 'security & privacy'
  },
  {
    iconImgSrc: 'https://clickup.com/images/kindness/uptime.svg',
    summaryText: 'Highest levels of uptime the last 12 months',
    linkText: 'the last 12 months'
  }
];
