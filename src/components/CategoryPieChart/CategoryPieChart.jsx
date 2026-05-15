import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"
import { CustomTooltip } from "../ToolTip/CustomToolTip"

export default function CategoryPieChart({data, loading, error}){

    if(loading) return "Loading element"
    if(error) return `Error: ${error}`
    if(!data || data.length === 0) return "Empty data"

    return(
        <div className="bg-white rounded-xl p-[25px] text-left  w-full card-container">
            <h1 className="text-sm font-normal text-gray-400 mb-2 uppercase tracking-wider">Expenses by category</h1>
            <div className="flex card-body">
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Pie data={data} dataKey="percentage" cx="50%" cy="50%" outerRadius={110}>
                            {data.map((item)=>(
                                <Cell key={item.category} fill={item.color}></Cell>
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip/>}></Tooltip>
                    </PieChart>
                    
                </ResponsiveContainer>

                <div className="flex flex-col text-center mt-4 gap-2 justify-center">
                    {data.map((item)=>(
                        <div key={item.category} className="flex items-center ">
                            <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: item.color}}></div>
                            <span className="text-sm text-gray-600">{item.category}</span>
                            <span className="text-sm text-gray-400 ml-auto">{item.formattedPercentage}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
        
    )
}