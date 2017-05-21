/**
 * Created by jdbla on 5/19/2017.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SkyLight from 'react-skylight';

/** Variables **/
var CHARACTER = {
    id: 1,
    characterName: "Lucy Bard",
    description: "Terran Captain",
    health: 8,
    willpower: 6,
};

var MAINSKILLS = [
    { name: "Intelligence", category: "Mental", value: 1 },
    { name: "Wits", category: "Mental", value: 1 },
    { name: "Resolve", category: "Mental", value: 1 },
    { name: "Strength", category: "Physical", value: 1 },
    { name: "Dexterity", category: "Physical", value: 1 },
    { name: "Stamina", category: "Physical", value: 1 },
    { name: "Presence", category: "Social", value: 1 },
    { name: "Manipulation", category: "Social", value: 1 },
    { name: "Composure", category: "Social", value: 1 }
];

var MENTALSKILLS = [
    { name: "Academics", value: 1 },
    { name: "Computers", value: 1 },
    { name: "Field Engineering", value: 1 },
    { name: "Investigation", value: 1 },
    { name: "Medical", value: 1 },
    { name: "Xenoanthropology", value: 1},
    { name: "Politics", value: 1 },
    { name: "Science", value: 1 }
];

var PHYSICALSKILLS = [
    { name: "Athletics", value: 1 },
    { name: "Hand-to-Hand", value: 1 },
    { name: "Helm/Drive", value: 1 },
    { name: "Ranged Combat", value: 1 },
    { name: "Larceny", value: 1 },
    { name: "Stealth", value: 1},
    { name: "Survival", value: 1 },
    { name: "Weaponry", value: 1 }
];

var SOCIALSKILLS = [
    { name: "Empathy", value: 1 },
    { name: "Expression", value: 1 },
    { name: "Intimidation", value: 1 },
    { name: "Persuasion", value: 1 },
    { name: "Socialize", value: 1 },
    { name: "Streetwise", value: 1},
    { name: "Subterfuge", value: 1 },
    { name: "Xenozoology", value: 1 }
];

var DICESIDES = 10;

/** Components **/

class DiceRoller extends Component {
    constructor(props) {
        super(props);
        this.state = { result:0, history: [], };
    }

    _computeDiceRoll() {
        if (this.state.result || this.state.history) {
            this.setState({
                result: 0,
                history: [],
            });
        }
        var numDice = this.props.diceNum;
        var sides = 10;
        var history = [];
        var rolled = 0;
        for (var r = 0; r < numDice; r++) {
            var roll = Math.floor(Math.random() * ( ( sides - 1 ) + 1 ));
            if (roll === 7 || roll === 8 || roll === 9) {
                rolled++;
            }
            if (roll === 0) {
                rolled += 2;
            }
            if (roll === 1) {
                rolled--;
            }
            history.push(roll);
        }
        this.setState({
            result: rolled,
            history: history,
        });
    }

    render() {
        return (
            <div id="roller">
                <button
                    id="roll"
                    onClick={() => this.refs.rollerModal.show()}>
                    Roll
                </button>
                <SkyLight
                    beforeOpen={this._computeDiceRoll()}
                    ref="rollerModal">
                    <div>Result: {this.state.result}</div>
                    <div>History: {this.state.history.toString()}</div>
                </SkyLight>
            </div>
        );
    }
}

class Header extends Component {
    render() {
        return (
            <div id="character">
                <span id="name"><h2>{this.props.character.characterName} </h2></span>
                <span id="health">Health: {this.props.character.health} </span>
                <span id="willpower">Will Power: {this.props.character.willpower} </span>
                <div id="description">{this.props.character.description}</div>
            </div>
        );
    }
}

class SkillsCategoryRow extends Component {
    render() {
        return <tr>
            <th colSpan="2">{this.props.category}</th>
        </tr>;
    }
}

class SkillsTable extends Component {
    renderSkills() {
        var skillArray = [];
        var lastCategory = null;
        this.props.skills.forEach((skill) => {
            if (skill.category !== lastCategory ) {
                skillArray.push(<SkillsCategoryRow category={skill.category}/>);
                lastCategory = skill.category;
            }
            skillArray.push(
                <tr>
                    <td>{skill.name}</td>
                    <td>{skill.value}</td>
                </tr>
            );
        });
        return skillArray;
    }

    render() {
        return (
          <div className="TableConatainer">
              <table>
                  <thead>
                      <tr>
                          <th>Skill</th>
                          <th>Rank</th>
                      </tr>
                  </thead>
                  <tbody>
                      {this.renderSkills()}
                  </tbody>
              </table>
          </div>
        );
    }
}

/** Execution **/

var skillTabs = (
    <Tabs>
        <TabList>
            <Tab>Mental</Tab>
            <Tab>Physical</Tab>
            <Tab>Social</Tab>
        </TabList>

        <TabPanel>
            <SkillsTable skills={MENTALSKILLS} />
        </TabPanel>
        <TabPanel>
            <SkillsTable skills={PHYSICALSKILLS} />
        </TabPanel>
        <TabPanel>
            <SkillsTable skills={SOCIALSKILLS} />
        </TabPanel>
    </Tabs>
);

var mySkillTable = <SkillsTable skills={MAINSKILLS}/>;
var myHeader = <Header character={CHARACTER}/>;
var myDiceRoller = <DiceRoller diceNum={10} />;

ReactDOM.render(myHeader, document.querySelector("#header"));
ReactDOM.render(mySkillTable, document.querySelector("#root"));
ReactDOM.render(skillTabs, document.querySelector("#secondaryskills"));
ReactDOM.render(myDiceRoller, document.querySelector("#rollpane"));