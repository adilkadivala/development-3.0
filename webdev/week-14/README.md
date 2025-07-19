<!-- typescript -->

# steps

npm install typescript
npx tsc --init

<!-- run file -->

npx tsc -b

<!-- interface -->

interface is used to create complex type like nested object etc.

interface User {
name:String,
age:Number,
address?:{ <!-- ? used for making field optional -->
city:String,
country:String,
}
}

<!-- difference betweeen abstract class v/s interface -->

abstract class is similar to interface. we can implemt default properties in abstract class, we can't do it in interface.

<!-- difference betweeen type v/s interface -->

1> diffrence is in defigning (in syntext)

interface User {

}

type User = {

}

2> in interface we can't do uniun and intersection
3> interface implement by classes, Types can't implement by classes
