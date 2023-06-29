class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key
    this.value = value
    this.parent = parent
    this.left = left
    this.right = right
  }

  insert (key, value) {
    if (this.key == null) {
      this.key = key
      this.value = value
    }

    else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this) 
      } else {
        //recursively call insert to move further into tree
        this.left.insert(key, value)
      }
    }

    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this)
      } else {
        //recursively call insert to move further into tree
        this.right.insert(key, value)
      }
    }
  }

  find (key) {
    if (this.key == key) {
      return this.value
    } 

    else if (key < this.key && this.left) {
      //recursively call find to the left branch
      return this.left.find(key)
    }

    else if (key > this.key && this.right) {
      //recursively call find to the right branch
      return this.right.find(key)
    }

    else {
      throw new Error ('Key not found')
    }
  }

  remove(key) {
    if (this.key == key) {
      if(this.left && this.right) {
        const successor = this.right._findMin()
        this.key = successor.key
        this.value = successor.value
        successor.remove(successor.key)
      }

      //If node only has left child
      //replace the node with left child
      else if(this.left) {
        this._replaceWith(this.left)
      }

      //if node only has right child
      //replace the node with right child
      else if(this.right) {
        this._replaceWith(this.right)
      }

      //if node has no children
      //remove it and any references by replacing with null
      else {
        this._replaceWith(null)
      }
    }

    else if(key < this.key && this.left) {
      //recursively move into left branch
      this.left.remove(key)
    }

    else if(key > this.key && this.right) {
      //recursively move into right branch
      this.right.remove(key)
    }

    else {
      throw new Error('Key not found')
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if(this == this.parent.left) {
        this.parent.left = node
      }

      else if(this == this.parent.right) {
        this.parent.right = node
      }

      if(node) {
        node.parent = this.parent
      }
    }

    else {
      if (node) {
        this.key = node.key
        this.value = node.value
        this.left = node.left
        this.right = node.right
      }

      else {
        this.key = null
        this.value = null
        this.left = null
        this.right = null
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this
    }
    //Recursively move through left
    //until find a node with no left 
      //i.e. the minimum value
    return this.left._findMin()
  }
}
