/* an action has the following attributes:
 displayName: The name of the action which will be displayed.
 effectName: The name of the effect which is used to determine what the action will do depending on the rules set for the plant.
 data: An object which can contain anything else. For example, a message from the user who did the action.
 stats: The resulting stats of the plant after the action happens.
 plantSQL_ID: The ID in the mySQL database of the plant that this action refers to.
 playerSQL_ID: The ID in the mySQL database player who performed the action, or the current owner of the plant if it wasn't a player directed action.

*/
class Action{

	constructor(displayName, effectName, stats, data, plantSQL_ID, playerSQL_ID){

		//this enables you to pass an object with keys matching the parameters instead of passing the parameters directly.
		if(typeof name === "object")
		{
			Object.assign(this, name);
		}
		else
		{
			this.displayName = displayName;
			this.effectName = effectName;
			this.stats = stats;
			this.plantSQL_ID = plantSQL_ID;
			this.playerSQL_ID = plantSQL_ID;
		}
	}

	toJSONString(){
		return JSON.stringify(this);
	};
}