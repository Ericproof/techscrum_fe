import { ITextPart } from './ReusableSection/TextPart/TextPart';

const REUSABLE_SECTION_TEXT: ITextPart[] = [
  {
    subtitle: 'Ongoing Tasks',
    heading: 'Work in Progress',
    text: "Work in Progress refers to tasks that need to be completed in the current sprint, which means a specific time period during which your team is focused on achieving a set of predetermined tasks or goals. The particular length and timing of the sprint can vary depending on the team's needs and the project's nature. All the tasks in this section must with high priority and well-planned before it starts. This can help your team to plan specific goals for the current sprint and execute them efficiently."
  },
  {
    subtitle: 'Upcoming Tasks',
    heading: 'Work in Backlog',
    text: 'Work in backlog refers to tasks planned and scheduled for completion in the future. It is useful for your team to plan and ensure team members clearly understand what tasks need to be completed and when. These tasks have been identified as a medium priority and necessary but have not yet been scheduled for execution. As your team completes tasks from the current sprint, you can pull tasks from the backlog section and move them into the current sprint.'
  },
  {
    subtitle: 'Unplanned Tasks',
    heading: 'Work in Advance',
    text: 'Work in advance refers to unplanned tasks with a low priority that has not been assigned to anyone, but their requirement has been confirmed and needs to be done in the future—for example, tech debt. If a team member starts working on a task that is not the top priority, it can cause confusion or delays in the overall project plan. After finishing tasks in the current sprint and backlog, your team can pull relatively urgent tasks from this section and move them into the current sprint.'
  }
];

export default REUSABLE_SECTION_TEXT;
