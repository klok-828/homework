import React from 'react'
import "./TransTable.css";

export const TransTable = ( { trans }) => {
    const calReward = (amt) => {
        let points = 0;

        if (amt > 50 && amt < 100) {
            points = amt - 50;
        } else if (amt > 100) {
            points = (2 * (amt - 100) + 50);
        }
        return points; 
    };

    const transWithReward = trans.map(el => ({
        ...el,
        rewards: calReward(el.amount),
    }));

    console.log(transWithReward);

    const result = transWithReward.reduce((c, v) => {
        c[v.name] = (c[v.name] || 0) + parseInt(v.rewards);
        return c;
    }, {});

    const group_by_month = (data) => {
        var months = {};
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var date = new Date(obj.tdate);
            var month = date.getMonth();
            if (months[month]) {
                months[month].push(obj);
            }
            else {
                months[month] = [obj];
            }
        }
        return months;
    };

    const groupByMonth = group_by_month(transWithReward);


    const size = Object.keys(groupByMonth).length;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const rewardsPerMon =[];

            for(let i = 0; i < size; i++) {
            const result2 = groupByMonth[i].reduce((c, v) => {
                c[v.name] = (c[v.name] || 0) + parseInt(v.rewards);
                return c;
            }, {});

            
            var array = Object.keys(result2).map(function(name) {
                return {
                    name: name,
                    month: months[i],
                    rewards: result2[name]
                }
            })

            rewardsPerMon.push(array);

        }


    
  return (
    <div>

        {/* {transWithReward.map(tran => (
        <div key={tran.transid} className="">
          {tran.tdate}
          {tran.name}
          {tran.amount}
        </div>
      ))} */}


        <table>
            <tr>
                <th>Name</th>
                <th>Month</th>
                <th>Rewards</th>
            </tr>
            {rewardsPerMon.map(x => x.map(({name, month, rewards}) => (
                        <tr>
                            <td>{name}</td>
                            <td>{month}</td>
                            <td>{rewards}</td>
                        </tr>
                    )))}
        </table>

        <table>
            <tr>
                <th>Name</th>
                <th>Total Rewards</th>
            </tr>
            {Object.entries(result).map(([key,val]) => (
                <tr>
                    <td>{key}</td>
                    <td>{val}</td>
                </tr>
            ))}
        </table>


    </div>
  )
}
