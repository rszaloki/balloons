import kiwi from 'kiwi.js'

console.log(kiwi)

const layout = (state, getters) => {
  const gap = 20
  const fields = getters.fields
  const solver = new kiwi.Solver()
  let __currentLeft = gap

  const _layout = fields.reduce((acc, current) => {
    const fieldVariables = {
      id: current.id,
      left: new kiwi.Variable(),
      top: new kiwi.Variable(),
      width: new kiwi.Variable(),
      height: new kiwi.Variable(),
      hcenter: new kiwi.Variable(),
      vcenter: new kiwi.Variable(),
      right: new kiwi.Variable(),
      bottom: new kiwi.Variable(),
      src: current.file
    }

    solver.addEditVariable(fieldVariables.left, kiwi.Strength.weak)
    solver.addEditVariable(fieldVariables.top, kiwi.Strength.weak)
    solver.addEditVariable(fieldVariables.width, kiwi.Strength.strong)
    solver.addEditVariable(fieldVariables.height, kiwi.Strength.strong)

    // hcenter
    solver.addConstraint(
      new kiwi.Constraint(
        new kiwi.Expression([-1, fieldVariables.hcenter], fieldVariables.left, [
          0.5,
          fieldVariables.width
        ]),
        kiwi.Operator.Eq,
        0,
        kiwi.Strength.required
      )
    )

    // vcenter
    solver.addConstraint(
      new kiwi.Constraint(
        new kiwi.Expression([-1, fieldVariables.vcenter], fieldVariables.top, [
          0.5,
          fieldVariables.height
        ]),
        kiwi.Operator.Eq,
        0,
        kiwi.Strength.required
      )
    )

    // bottom
    solver.addConstraint(
      new kiwi.Constraint(
        new kiwi.Expression(
          [-1, fieldVariables.bottom],
          fieldVariables.top,
          fieldVariables.height
        ),
        kiwi.Operator.Eq,
        0,
        kiwi.Strength.required
      )
    )

    // right
    solver.addConstraint(
      new kiwi.Constraint(
        new kiwi.Expression(
          [-1, fieldVariables.right],
          fieldVariables.left,
          fieldVariables.width
        ),
        kiwi.Operator.Eq,
        0,
        kiwi.Strength.required
      )
    )

    solver.addConstraint(
      new kiwi.Constraint(
        fieldVariables.top,
        kiwi.Operator.Ge,
        0,
        kiwi.Strength.required
      )
    )
    solver.addConstraint(
      new kiwi.Constraint(
        fieldVariables.left,
        kiwi.Operator.Ge,
        0,
        kiwi.Strength.required
      )
    )

    solver.suggestValue(fieldVariables.left, __currentLeft)
    solver.suggestValue(fieldVariables.top, gap)
    solver.suggestValue(fieldVariables.width, current.width)
    solver.suggestValue(fieldVariables.height, current.height)

    acc[current.id] = fieldVariables
    __currentLeft = __currentLeft + gap + current.width
    return acc
  }, {})

  fields.forEach(field => {
    const myId = field.id
    if (field.constrains.length) {
      field.constrains.forEach(constraint => {
        const myProp = constraint[0]
        const [otherId, otherProp] = constraint[1].split(':')
        solver.addConstraint(
          new kiwi.Constraint(
            new kiwi.Expression(
              [-1, _layout[myId][myProp]],
              _layout[otherId][otherProp]
            )
          ),
          kiwi.Operator.Eq,
          0,
          kiwi.Strength.strong
        )
      })
    }
  })

  solver.updateVariables()

  const result = Object.keys(_layout).map(id => {
    const current = _layout[id]
    return {
      id: current.id,
      left: current.left.value(),
      top: current.top.value(),
      width: current.width.value(),
      height: current.height.value(),
      src: current.src
    }
  })

  console.log(result)
  return result
}

export { layout }
