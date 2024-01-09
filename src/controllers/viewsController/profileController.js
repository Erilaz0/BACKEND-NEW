async function profile( req , res ){
    const userData = req.cookies.datos
    console.log(userData)

    res.status(200).render("profile",{



    })

}

module.exports = profile