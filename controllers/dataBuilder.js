const Products = require("../models/product");
const helper = (req) => {
  const month = req.query.month;
  const comp = new Date(`2020${month}`).getMonth() + 1;
  console.log("here : "+comp);
  reg = `^202[12]-0*${comp}`;
  console.log(reg)
  let aggregate = [];
  aggregate.push({ $match: { dateOfSale: { $regex: reg } } });
  return aggregate;
};

//funtion to get statistics
const stats = async (req) => {
    let aggregate = helper(req);
    aggregate.push({
      $group: {
        _id: null,
        total: {
          $sum: {
            $cond: { if: { $eq: ["$sold", true] }, then: "$price", else: 0 },
          },
        },
        sold: {
          $sum: {
            $cond: { if: { $eq: ["$sold", true] }, then: 1, else: 0 },
          },
        },
        notSold: {
          $sum: {
            $cond: { if: { $eq: ["$sold", true] }, then: 0, else: 1 },
          },
        },
      },
      
    },{
        $project: {
          _id: 0,
        },
      });
    let data = await Products.aggregate(aggregate);
    console.log(data);
    if (data) data = data[0];
   return(data)
  }


//funtion to bar chart data
const bar = async (req, res) => {

    let aggregate = helper(req);
    aggregate.push({
      $group: {
        _id: null,
        "0-100": {
          $sum: {
            $cond: { if: { $lt: ["$price", 101] }, then: 1, else: 0 },
          },
        },
        "101-200": {
          $sum: {
            $cond: {
              if: {
                $and: [{ $gt: ["$price", 100] }, { $lt: ["$price", 201] }],
              },
              then: 1,
              else: 0,
            },
          },
        },
        "201-300": {
          $sum: {
            $cond: {
              if: {
                $and: [{ $gt: ["$price", 200] }, { $lt: ["$price", 301] }],
              },
              then: 1,
              else: 0,
            },
          },
        },
        "301-400": {
          $sum: {
            $cond: {
              if: {
                $and: [{ $gt: ["$price", 300] }, { $lt: ["$price", 401] }],
              },
              then: 1,
              else: 0,
            },
          },
        },
        "401-500": {
          $sum: {
            $cond: {
              if: {
                $and: [{ $gt: ["$price", 400] }, { $lt: ["$price", 501] }],
              },
              then: 1,
              else: 0,
            },
          },
        },
        "501-600": {
          $sum: {
            $cond: {
              if: {
                $and: [{ $gt: ["$price", 500] }, { $lt: ["$price", 601] }],
              },
              then: 1,
              else: 0,
            },
          },
        },
        "601-700": {
          $sum: {
            $cond: {
              if: {
                $and: [{ $gt: ["$price", 600] }, { $lt: ["$price", 701] }],
              },
              then: 1,
              else: 0,
            },
          },
        },
        "701-800": {
          $sum: {
            $cond: {
              if: {
                $and: [{ $gt: ["$price", 700] }, { $lt: ["$price", 801] }],
              },
              then: 1,
              else: 0,
            },
          },
        },
        "801-900": {
          $sum: {
            $cond: {
              if: {
                $and: [{ $gt: ["$price", 800] }, { $lt: ["$price", 901] }],
              },
              then: 1,
              else: 0,
            },
          },
        },
        "901-above": {
          $sum: {
            $cond: {
              if: { $gt: ["$price", 900] },
              then: 1,
              else: 0,
            },
          },
        },
      },
    },{
        $project: {
          _id: 0,
        },
      });
    let data = await Products.aggregate(aggregate);
    console.log(data);
    if (data) data = data[0];
return data
};
//funtion to get pie chart data
const pie = async (req, res) => {

    let aggregate = helper(req);
    aggregate.push(
      {
        $group: {
          _id: "$category",
          items: { $sum: 1 },
        },
      },
      {
        $project: {
          category: "$_id",
          items: 1,
          _id: 0,
        },
      }
    );
    const data = await Products.aggregate(aggregate);
    return { data };
};
//funtion to get all chart data
const all = (req, res) => {

};
module.exports = { stats, bar, pie, all };
