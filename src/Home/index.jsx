import { Child, Section } from "./styled"

import { useState, useEffect, useRef } from "react";
import { useParent } from "../context/ParentContext";

function Tree({data = [], check, refParent}){
    const [trees, setTrees] = useState([]);
    

    useEffect(() => {
        function recursive(values){
            return Object.entries(values).map(([, value]) => {
                return{
                    id: value.id,
                    name: value.name,
                    level: value.level,
                    children: recursive(value.children)
                }
            });
        }
        setTrees(recursive(data))
    }, [data])

    

    return(
        <Section>
           {trees.map(tree=> (
               <TreeNode refParents={refParent} key={tree.id} node={tree} checkParent={check} />
           ))}
        </Section>
    )
}

const TreeNode = ({node, checkParent, refParents}) => {

    const hasChild = node.hasOwnProperty('children');
    const refCheck = useRef(null);
    const [check, setCheck] = useState(false)
    const {indeterminate, setIndeterminate} = useParent();


    function handleCheck() {
        setCheck(!check)

        setIndeterminate(!indeterminate)
        refParents.current.indeterminate = !indeterminate        
    }

    return(
        <Child>
            <li>
                <input ref={refCheck} type="checkbox" name={node.name} id={node.name} onChange={handleCheck} checked={checkParent || check} /> 
                <label htmlFor={node.name}>{node.name}</label>
                {
                    hasChild && <Tree refParent={refCheck} data={node.children} check={checkParent || check} />
                }
            </li>

        </Child>
    )
}

export default Tree;