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
        'set #ag = :age, #com = :company, #nam = :name,#sal=:salary',
      ExpressionAttributeValues: {
        ":age": user.age, ":company": user.company, ":name": user.name, ":salary": user.salary,
      },
      ExpressionAttributeNames: {
        "#ag": "age",
        "#com": "company",
        "#nam": "name",
        "#sal": "salary",
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
