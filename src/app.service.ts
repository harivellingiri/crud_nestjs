import { Injectable } from '@nestjs/common';
import { User } from './user.dto';
import { DynamoDB } from 'aws-sdk';
import { db, Table } from './db.config.js';
// const Table = 'hari-user'
// const db = new DynamoDB.DocumentClient()
@Injectable()
export class AppService {
  async getUser(): Promise<any> {
    const params = {
      TableName: Table,
    }
    try {
      const { Items = [] } = await db.scan(params).promise()
      console.log(Items)
      return Items

    } catch (error) {
      console.log(error)
      return false
    }
  }
  async createUser(user: User): Promise<boolean> {
    const params = {
      TableName: Table,
      Item: user
    }

    try {
      await db.put(params).promise()
      return true
    } catch (error) {
      console.log(error)
      return false
    }

  }
  async updateUser(id: string, user: User): Promise<boolean> {
    const params = {
      TableName: Table,
      Key: {
        userId: id
      },
      UpdateExpression:
        'set #emai = :email, #phon = :phone, #nam = :name, #enrol = :enroll,#admis=:admission',
      ExpressionAttributeValues: {
        ":email": user.email, ":phone": user.phone, ":name": user.name, ":enroll": user.enroll, ":admission": user.admission,
      },
      ExpressionAttributeNames: {
        "#emai": "email",
        "#phon": "phone",
        "#nam": "name",
        "#admis": "admission",
        "#enrol": "enroll",
      }
    }
    // UpdateExpression = 'SET #ts = :val1',
    //   ExpressionAttributeValues = {
    //     ":val1": new_timestamp
    //   },
    //   ExpressionAttributeNames = {
    //     "#ts": "timestamp"
    //   }
    try {
      console.log(user)
      await db.update(params).promise()
      return true
    } catch (error) {
      console.log(error)
      return false
    }


  }
  async deleteUser(id: String): Promise<any> {
    const params = {
      TableName: Table,
      Key: {
        userId: id
      }
    }

    try {
      await db.delete(params).promise()
      console.log("user deleted")
      return true

    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getSpecficUser(userid: String): Promise<any> {
    const params = {
      TableName: Table,
      Key: {
        userId: userid
      }
    }
    try {
      const Item = await db.get(params).promise()
      console.log(Item)
      return Item
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
