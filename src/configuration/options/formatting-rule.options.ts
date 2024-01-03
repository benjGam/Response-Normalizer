import { WordCasing } from '../word-casing';

export default class FormattingRule {
  public subStringSequence: string;
  public casing?: WordCasing = WordCasing.DEFAULT;
  public replaceBy?: string | null = null;
}
