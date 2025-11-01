import { Sendable } from '../../models/Sendable';
import { TaskBuilder } from '../../models/TaskBuilder';
import { htmlToElement } from '../../utils/dom';
import { Parser } from '../Parser';

export class LeetCodeProblemParser extends Parser {
  public getMatchPatterns(): string[] {
    return [
      'https://leetcode.cn/problems/*',
      'https://leetcode.cn/problems/*/*'
    ];
  }

  public async parse(url: string, html: string): Promise<Sendable> {
    const doc = htmlToElement(html);
    const task = new TaskBuilder('LeetCode').setUrl(url);

    const title = doc.querySelector('.no-underline hover:text-blue-s dark:hover:text-dark-blue-s truncate cursor-text whitespace-normal hover:!text-[inherit]').textContent;
    task.setName(title.replace(/\s+/g, ' ').trim());

    //who knows?
    task.setTimeLimit(-1);
    task.setMemoryLimit(-1);

    var elements = document.getElementsByClassName('example-io');
    for(let i = 0;i < elements.length;i += 2){
      task.addTest(elements[i].textContent, elements[i + 1].textContent);
    }

    return task.build();
  }
}
